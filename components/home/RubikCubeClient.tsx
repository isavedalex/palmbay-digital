"use client";

import { useEffect, useRef } from "react";

export function RubikCubeClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL 2 not supported");
      return;
    }

    const vertexShaderSource = `#version 300 es
      precision highp float;
      in vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 O;
uniform float time;
uniform vec2 resolution;

#define FC gl_FragCoord.xy
#define R resolution
#define T mod(time, 32.)
#define N normalize
#define S smoothstep
#define MN min(R.x, R.y)
#define rot(a) mat2(cos((a) - vec4(0, 11, 33, 0)))
#define NUM 2.4
#define procd (T * .125)
#define scene int(floor(mod(procd, 4.)))
#define PI radians(180.)

vec3 gridSnap(vec3 p) {
  return clamp(floor(p / NUM + 0.5), -1., 1.) * NUM;
}

float rnd(vec3 p) {
  p = fract(p * vec3(12.9898, 78.233, 156.345));
  p += dot(p, p + 12.56);
  return fract(p.x * p.y * p.z);
}

float noise(vec3 p) {
  const vec3 s = vec3(7, 157, 113);
  vec3 ip = floor(p);
  vec4 h = vec4(0, s.yz, s.y + s.z) + dot(ip, s);
  p -= ip;
  p = p * p * (3. - 2. * p);
  h = mix(fract(sin(h) * 43758.5453), fract(sin(h + s.x) * 43758.5453), p.x);
  h.xy = mix(h.xz, h.yw, p.y);
  return mix(h.x, h.y, p.z);
}

float box(vec3 p, vec3 s) {
  p = abs(p) - s;
  return length(max(p, .0)) + min(.0, max(max(p.x, p.y), p.z)) - .05;
}

vec4 map(vec3 p, out vec3 q) {
  int sc = scene;
  float t = 3.14 - mix(T, T + 1., pow(sin(T * PI / 4. - PI / 2.) * .5 + .5, 5.));

  if (sc == 0) {
    if (abs(p.y) < NUM / 2.) p.xz *= rot(t);
  } else if (sc == 1) {
    if (p.x > NUM / 2.) p.yz *= rot(t);
  } else if (sc == 2) {
    if (p.x < -NUM / 2.) p.yz *= rot(t);
  } else {
    if (p.y > NUM / 2.) p.xz *= rot(t);
  }

  q = p;
  vec3 id = floor(p / NUM + 0.5);
  p -= gridSnap(p);

  return vec4(box(p, vec3(1)) * .5 - 8e-3 * (noise(p * 24.) + noise(p * 48.)), id);
}

vec3 norm(vec3 p) {
  float h = 1e-3;
  vec2 k = vec2(-1, 1) * .5773;
  vec3 q = p;
  return N(
    k.xyy * map(p + k.xyy * h, q).x +
    k.yxy * map(p + k.yxy * h, q).x +
    k.yyx * map(p + k.yyx * h, q).x +
    k.xxx * map(p + k.xxx * h, q).x
  );
}

float getsss(vec3 p, vec3 rd, float dist, float k) {
  if (dist < 5e-5) return .0;
  float ddist = dist * k;
  vec3 q = p;
  return
    clamp(map(p + rd * dist, q).x / dist, .0, 1.) +
    clamp(map(p + rd * ddist, q).x / ddist, .0, 1.);
}

vec3 aces(const vec3 x) {
  const float a = 2.51, b = .03, c = 2.43, d = .59, e = .14;
  return (x * (a * x + b)) / (x * (c * x + d) + e);
}

void cam(inout vec3 p) {
  return;
}

void main() {
  vec2 uv = (FC - .5 * R) / MN;
  vec3 col = vec3(0);
  vec3 p = vec3(0, 0, -14);
  vec3 rd = N(vec3(uv, 1.1));

  cam(p);
  cam(rd);

  bool hit = false;
  float dd = 0.;
  vec3 id, q;

  for (int i = 0; i < 200; i++) {
    vec4 d = map(p, q);

    if (abs(d.x) < 1e-3) {
      hit = true;
      id = d.yzw;
      break;
    }

    if (dd > 100.) break;

    p += rd * d.x;
    dd += d.x;
  }

  if (hit) {
    vec3 n = norm(p);
    vec3 lp = vec3(1, 12, -14);
    cam(lp);
    vec3 l = N(lp - p);

    float dif = clamp(dot(l, n), .0, 1.);
    float spec = pow(clamp(dot(reflect(rd, n), l), .0, 1.), 32.);

    float steps = 10.;
    float sss = .0;
    float k = mix(.8, 1., rnd(rd + T));

    for (float i = .0; i < steps; i++) {
      float dist = i / steps * k;
      sss += getsss(p, N(lp), dist, 12.);
    }

    sss *= .21;

    float f = rnd(id * 1.5 - 12.);

    vec3 lightPink = vec3(0.996, 0.502, 0.890);
    vec3 darkMagenta = vec3(0.749, 0.298, 0.569);
    vec3 mat = mix(lightPink, darkMagenta, f * 0.5 + 0.3 * noise(q.zyz * (2. - f)));

    col += sss * mat;
    col += .1 * mat + .02 * dif * mat;
    col += spec * .5 * mat + spec * .75;
    col = tanh(col * col * col);
    col = sqrt(col);
  }

  if (!hit) {
    col = vec3(0.290, 0.322, 0.851);
  } else {
    col = aces(col);
    col = S(.0, 1., col);
  }

  O = vec4(col, 1);
}`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    const vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "time");
    const resolutionLocation = gl.getUniformLocation(program, "resolution");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let animationFrame = 0;
    const render = (time: number) => {
      gl.clearColor(0.29, 0.322, 0.851, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full min-h-[256px] md:min-h-[400px]"
    />
  );
}
