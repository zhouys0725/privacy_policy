import * as THREE from './vendor/three-0.170.0.module.min.js';

const canvas = document.querySelector('#sculpture');
const stage = document.querySelector('#sculpture-stage');
if (canvas && stage) {
  try {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 50);
    camera.position.z = 7.8;
    const environment = document.createElement('canvas');
    environment.width = 1024; environment.height = 512;
    const ctx = environment.getContext('2d');
    const base = ctx.createLinearGradient(0, 0, 0, 512);
    base.addColorStop(0, '#c6d7ed'); base.addColorStop(.4, '#172331'); base.addColorStop(.55, '#080b12'); base.addColorStop(1, '#60758f');
    ctx.fillStyle = base; ctx.fillRect(0, 0, 1024, 512);
    for (const [x, width] of [[80, 130], [420, 220], [850, 65]]) {
      const light = ctx.createLinearGradient(x, 0, x + width, 0);
      light.addColorStop(0, 'rgba(235,245,255,0)'); light.addColorStop(.4, '#f0f6ff'); light.addColorStop(.6, '#ffffff'); light.addColorStop(1, 'rgba(235,245,255,0)');
      ctx.fillStyle = light; ctx.fillRect(x, 20, width, 440);
    }
    const texture = new THREE.CanvasTexture(environment);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromEquirectangular(texture);
    scene.environment = env.texture; texture.dispose(); pmrem.dispose();
    const geometry = new THREE.TorusKnotGeometry(1.04, .28, 192, 28, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({ color: 0xc8d9ed, metalness: 1, roughness: .2, clearcoat: .25 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(.18, -.3, -.27); scene.add(mesh);
    let frame = 0, visible = true, pointerX = 0, pointerY = 0;
    const resize = () => { const r = stage.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); render(performance.now()); };
    const render = time => { mesh.rotation.y = -.3 + (reduced.matches ? 0 : Math.sin(time * .00012) * .27) + pointerX; mesh.rotation.x = .18 + pointerY; renderer.render(scene, camera); };
    const tick = time => { frame = 0; render(time); if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick); };
    const resume = () => { if (frame) cancelAnimationFrame(frame); frame = 0; if (visible && !document.hidden) frame = requestAnimationFrame(tick); };
    new ResizeObserver(resize).observe(stage);
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; resume(); }).observe(stage);
    document.addEventListener('visibilitychange', resume); reduced.addEventListener('change', resume);
    document.querySelector('.cinema-hero')?.addEventListener('pointermove', e => { if (!reduced.matches) { pointerX = (e.clientX / innerWidth - .5) * .12; pointerY = (e.clientY / innerHeight - .5) * .1; } }, { passive: true });
    canvas.addEventListener('webglcontextlost', () => { stage.classList.remove('loaded'); canvas.classList.remove('ready'); if (frame) cancelAnimationFrame(frame); });
    resize(); canvas.classList.add('ready'); stage.classList.add('loaded'); resume();
  } catch { /* The inline sculpture stays visible when WebGL is unavailable. */ }
}
