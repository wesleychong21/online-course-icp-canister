import { v4 as uuidv4 } from 'uuid';
import { Server, StableBTreeMap, ic } from 'azle';
import express from 'express';

/**
    This type represents a course that can be rolled by student.
*/
class Course {
    id: string;
    title: string;
    description: string;
    cost: string;

    createdAt: Date;
    updatedAt: Date | null
}