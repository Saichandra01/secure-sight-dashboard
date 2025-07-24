import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Cameras
  const camera1 = await prisma.camera.create({
    data: { name: 'Shop Floor A', location: 'Main Entrance' },
  });
  const camera2 = await prisma.camera.create({
    data: { name: 'Vault', location: 'Secure Room' },
  });
  const camera3 = await prisma.camera.create({
    data: { name: 'Entrance', location: 'Front Gate' },
  });

  const now = new Date();

  // Generate 12 sample incidents across 24 hours
  const incidents = [
    { cameraId: camera1.id, type: 'Unauthorized Access', tsStart: new Date(now.getTime() - 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 59 * 60 * 1000), thumbnailUrl: '/thumb1.jpg', resolved: false },
    { cameraId: camera2.id, type: 'Gun Threat', tsStart: new Date(now.getTime() - 2 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 118 * 60 * 1000), thumbnailUrl: '/thumb2.jpg', resolved: false },
    { cameraId: camera3.id, type: 'Face Recognized', tsStart: new Date(now.getTime() - 3 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 178 * 60 * 1000), thumbnailUrl: '/thumb3.jpg', resolved: true },
    { cameraId: camera1.id, type: 'Gun Threat', tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 238 * 60 * 1000), thumbnailUrl: '/thumb4.jpg', resolved: false },
    { cameraId: camera2.id, type: 'Unauthorized Access', tsStart: new Date(now.getTime() - 5 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 298 * 60 * 1000), thumbnailUrl: '/thumb5.jpg', resolved: false },
    { cameraId: camera3.id, type: 'Face Recognized', tsStart: new Date(now.getTime() - 6 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 358 * 60 * 1000), thumbnailUrl: '/thumb6.jpg', resolved: true },
    { cameraId: camera1.id, type: 'Gun Threat', tsStart: new Date(now.getTime() - 7 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 418 * 60 * 1000), thumbnailUrl: '/thumb7.jpg', resolved: true },
    { cameraId: camera2.id, type: 'Face Recognized', tsStart: new Date(now.getTime() - 8 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 478 * 60 * 1000), thumbnailUrl: '/thumb8.jpg', resolved: false },
    { cameraId: camera3.id, type: 'Unauthorized Access', tsStart: new Date(now.getTime() - 9 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 538 * 60 * 1000), thumbnailUrl: '/thumb9.jpg', resolved: true },
    { cameraId: camera1.id, type: 'Gun Threat', tsStart: new Date(now.getTime() - 10 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 598 * 60 * 1000), thumbnailUrl: '/thumb10.jpg', resolved: false },
    { cameraId: camera2.id, type: 'Face Recognized', tsStart: new Date(now.getTime() - 11 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 658 * 60 * 1000), thumbnailUrl: '/thumb11.jpg', resolved: true },
    { cameraId: camera3.id, type: 'Unauthorized Access', tsStart: new Date(now.getTime() - 12 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 718 * 60 * 1000), thumbnailUrl: '/thumb12.jpg', resolved: false },
  ];

  await prisma.incident.createMany({ data: incidents });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
