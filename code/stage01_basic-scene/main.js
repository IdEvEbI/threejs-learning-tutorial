// 导入 Three.js 模块
import * as THREE from "https://unpkg.com/three@0.171.0/build/three.module.js";

// 创建场景
const scene = new THREE.Scene();

// 创建透视摄像机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近截面
  1000 // 远截面
);

// 创建渲染器并设置大小
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染器的 DOM 元素添加到页面中
document.body.appendChild(renderer.domElement);

// 创建一个立方体几何体和基本材质
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // 绿色
const cube = new THREE.Mesh(geometry, material);

// 将立方体添加到场景中
scene.add(cube);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0x404040, 1); // 软白光
scene.add(ambientLight);

// 添加方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色光
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 调整摄像机位置，使得立方体可见
camera.position.z = 5;

// 创建动画循环
function animate() {
  requestAnimationFrame(animate);

  // 旋转立方体
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 渲染场景
  renderer.render(scene, camera);
}

// 启动动画循环
animate();

// 处理窗口大小变化，保持渲染器自适应
window.addEventListener("resize", () => {
  // 更新摄像机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // 更新渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight);
});
