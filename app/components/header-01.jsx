"use client";
import { Button } from "@relume_io/relume-ui";
import React, { useEffect, useRef } from "react";

// Rubik's Cube WebGL Component
function RubikCube() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    class Renderer {
      constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl2');
        
        if (!this.gl) {
          console.error('WebGL 2 not supported');
          return;
        }
        
        this.vertexShaderSource = `#version 300 es
          precision highp float;
          in vec4 position;
          void main() {
            gl_Position = position;
          }
        `;
        
        this.fragmentShaderSource = `#version 300 es
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
        
        this.vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
        
        this.setup();
        this.init();
      }
      
      compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
          this.gl.deleteShader(shader);
          return null;
        }
        
        return shader;
      }
      
      setup() {
        const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
        const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
          console.error('Program linking error:', this.gl.getProgramInfoLog(this.program));
          return;
        }
      }
      
      init() {
        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
        
        const position = this.gl.getAttribLocation(this.program, 'position');
        this.gl.enableVertexAttribArray(position);
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0);
        
        this.timeLocation = this.gl.getUniformLocation(this.program, 'time');
        this.resolutionLocation = this.gl.getUniformLocation(this.program, 'resolution');
      }
      
      resize() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        this.canvas.width = this.canvas.clientWidth * dpr;
        this.canvas.height = this.canvas.clientHeight * dpr;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }
      
      render(time) {
        this.gl.clearColor(0.290, 0.322, 0.851, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        
        this.gl.useProgram(this.program);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        
        this.gl.uniform1f(this.timeLocation, time * 0.001);
        this.gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
        
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      }
    }

    // Initialize renderer
    const renderer = new Renderer(canvas);
    rendererRef.current = renderer;

    const handleResize = () => {
      renderer.resize();
    };

    const animate = (time) => {
      renderer.render(time);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full min-h-[256px] md:min-h-[400px]"
    />
  );
}

export function Header1() {
  return (
    <section id="relume" className="min-h-screen flex items-center justify-center px-[5%] py-16 md:py-0 bg-palmbay-bluebg">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl text-white font-monument">
              PALM BAY DIGITAL
            </h1>
          
            <p className="md:text-md text-white font-helvetica font-light">
              Palm Bay Digital is a bespoke website design and development
              agency based in Margate, UK. We craft custom websites that help
              businesses and individuals stand out online. Ready to bring your
              vision to life? Let&apos;s create something exceptional together.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8 text-white">
              <a href="https://form.typeform.com/to/UEaAB8BR" rel="noopener noreferrer">
                <Button title="Work with us" className="bg-palmbay-pink border-palmbay-pink rounded-lg font-formula border-solid border-0 border-b-[4px] border-r-[4px] border-palmbay-darkpink">
                  Work with us
                </Button>
              </a>
            </div>
          </div>
           <div className="w-full flex items-center justify-center">
            <div className="w-64 h-64 md:w-96 md:h-96 lg:max-w-md lg:w-full lg:h-auto">
              <RubikCube />
            </div>
          </div>
          </div>
      </div>
    </section>
  );
}