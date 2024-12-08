# 几何体、材质与光源

## 一、概述

在上一章中，我们学习了如何创建基本的几何体（如立方体）并为其添加材质与光照效果。然而，**Three.js 提供了更丰富的几何体类型**（如**球体**、**平面**、**圆环**、**圆柱**等）和**更高级的材质功能**（如**纹理贴图**、**法线贴图**、**环境贴图**），借此可以构建更真实、更复杂的 3D 场景。

本章节将介绍常见几何体与高级材质类型的使用方法，并通过示例展示如何为物体添加纹理和法线贴图，以提升物体外观的细腻程度。

## 二、常见几何体类型

Three.js 内置了多种几何体（`Geometry` 或 `BufferGeometry`）类，常用的包括：

- **立方体（BoxGeometry）**：创建长方体或正方体。
- **球体（SphereGeometry）**：创建球形物体，如行星、气泡。
- **平面（PlaneGeometry）**：创建平面，用作地面或背景。
- **圆环（TorusGeometry）**：创建甜甜圈状物体，用于装饰或特殊造型。
- **圆柱（CylinderGeometry）**：创建圆柱体或圆锥体。

你可以根据项目需求选择合适的几何体，或者使用 `BufferGeometry` 自定义顶点数据，以实现特殊的形状。

### 示例：创建球体与平面

以下示例展示了如何创建球体与平面，并将它们添加到场景中。

```javascript
// 创建几何体与材质
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // 球体：半径 1
const planeGeometry = new THREE.PlaneGeometry(10, 10);      // 平面：宽 10，高 10

// 创建材质
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// 创建 Mesh 对象
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// 调整平面位置，使其作为地面（绕 X 轴旋转 90°）
plane.rotation.x = -Math.PI / 2;

// 将球体与平面添加到场景中
scene.add(sphere);
scene.add(plane);
```

通过上述代码，场景中会显示一个蓝绿色的球体漂浮在白色平面之上。

## 三、材质进阶

在前一章中，我们使用了 `MeshBasicMaterial` 和 `MeshStandardMaterial`。Three.js 提供了更多材质类型，以满足不同的渲染需求：

- **MeshLambertMaterial**：支持光照计算的漫反射材质，适用于柔和光影效果。
- **MeshPhongMaterial**：支持高光反射的材质，可呈现亮点和镜面效果。
- **MeshStandardMaterial**：基于 PBR（Physically Based Rendering）原理的材质，视觉真实，支持粗糙度、金属度等参数。
- **MeshPhysicalMaterial**：PBR 材质的升级版，提供更高级的特性（如折射、透明度控制、清晰度等）。

选择合适的材质取决于你的美术需求和性能要求。

### 3.1 使用纹理贴图

材质可以通过**纹理贴图**实现更丰富的视觉效果，如将木纹、石纹或金属表面应用到几何体上。

#### 示例：为平面添加木纹贴图

1. **准备纹理文件**：将木纹图像（如 `wood.jpg`）存放在项目的 `images/textures/` 目录下。
2. **加载纹理**：使用 `THREE.TextureLoader()` 加载纹理文件。
3. **应用纹理到材质**：

```javascript
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load("./images/textures/wood.jpg");

const texturedMaterial = new THREE.MeshStandardMaterial({
  map: woodTexture, // 纹理贴图
});

plane.material = texturedMaterial; // 替换材质
```

加载完成后，地面将显示木纹表面。

### 3.2 法线贴图与环境贴图

- **法线贴图（Normal Map）**：提供物体表面法线信息，使表面在光照下呈现凹凸效果，而无需增加实际几何面数。
- **环境贴图（Environment Map）**：通过映射周围环境到物体表面，模拟环境反射效果（如金属或玻璃）。

#### 示例：添加法线贴图

```javascript
// 加载法线贴图
const normalMap = textureLoader.load("./images/textures/normalMap.png");

const normalMapMaterial = new THREE.MeshStandardMaterial({
  map: woodTexture,       // 基础纹理
  normalMap: normalMap,   // 法线贴图
});

plane.material = normalMapMaterial; // 替换材质
```

通过法线贴图，平面在光照下会呈现凹凸效果，即使其几何形状仍然是平的。

### 3.3 调整材质参数

材质可以通过以下参数调整外观效果：

- **color**：基础颜色。
- **roughness**、**metalness**：控制表面的粗糙度和金属感（仅适用于 PBR 材质）。
- **emissive**：自发光颜色。
- **transparent**、**opacity**：控制透明度。

#### 示例：创建金属球体

```javascript
const metalMaterial = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  metalness: 1.0,
  roughness: 0.2,
});

const metalSphere = new THREE.Mesh(sphereGeometry, metalMaterial);
scene.add(metalSphere);
metalSphere.position.x = 3; // 移动球体位置
```

## 四、本章小结

通过本章的学习，你应已掌握以下内容：

1. **几何体类型**：了解如何创建立方体、球体、平面等几何体。
2. **材质类型**：熟悉 `MeshBasicMaterial`、`MeshLambertMaterial`、`MeshPhongMaterial` 和 `MeshStandardMaterial` 的适用场景。
3. **纹理与贴图**：学会使用 `TextureLoader` 添加纹理，并通过法线贴图增强细节。
4. **高级材质参数**：能够通过调整参数实现更真实的材质表现。

这些知识将为你构建复杂的 3D 场景奠定基础。

## 五、下一步

在掌握几何体与材质的使用后，请继续学习下一章节（`docs/cube-3x3x3.md`），探索如何构建 3x3x3 魔方，并实现局部旋转与动画效果，为更复杂的交互功能做准备。
