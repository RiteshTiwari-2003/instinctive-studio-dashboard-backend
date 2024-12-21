import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export const uploadAdminImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const imageUrl = `/uploads/admin/${req.file.filename}`;

        // Update admin profile image in database if needed
        // await prisma.admin.update({
        //     where: { id: req.admin.id },
        //     data: { profileImage: imageUrl }
        // });

        res.status(200).json({ 
            message: 'Admin image uploaded successfully',
            imageUrl 
        });
    } catch (error) {
        console.error('Error uploading admin image:', error);
        res.status(500).json({ error: 'Failed to upload admin image' });
    }
};

export const getAdminImage = async (req, res) => {
    try {
        // Logic to retrieve admin image
        // const admin = await prisma.admin.findUnique({
        //     where: { id: req.params.id }
        // });
        
        // if (!admin || !admin.profileImage) {
        //     return res.status(404).json({ error: 'Admin image not found' });
        // }

        // res.json({ imageUrl: admin.profileImage });
        res.status(200).json({ message: 'Get admin image endpoint' });
    } catch (error) {
        console.error('Error getting admin image:', error);
        res.status(500).json({ error: 'Failed to get admin image' });
    }
};
