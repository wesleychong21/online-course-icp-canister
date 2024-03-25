import { v4 as uuidv4 } from 'uuid';
import { Server, StableBTreeMap, ic, query, text, update, Void } from 'azle';
import express from 'express';

/**
 *  create enum for course status
 */
enum CourseStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    WAITING_for_APPROVAL = 'waiting for approval',
}
/**
    This type represents a course that can be rolled by student.
*/
class Course {
    id: string;
    title: string;
    description: string;
    cost: string;
    status: string;
    createdAt: Date;
    updatedAt: Date | null
}

/**
 * create class for admin
 */
class Admin {
    id: string;
    name: string;
    email: string;
    phone: string;
    superAdmin: boolean;
    createdAt: Date;
    updatedAt: Date | null
}

/**
 * create class for intructor
 */
class Instructor {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date | null
}

/**
 * create class for student 
 */
class Student {
    id: string;
    name: string;
    email: string;
    phone: string;
    walletAddress: string;
    createdAt: Date;
    updatedAt: Date | null
}

/**
 * create class for course registration
 */
class CourseRegistration {
    id: string;
    courseId: string;
    studentId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date | null
}

const app = express();
app.use(express.json());

const coursesStorage = StableBTreeMap<string, Course>(0);
const adminsStorage = StableBTreeMap<string, Admin>(0);
const instructorsStorage = StableBTreeMap<string, Instructor>(0);
const studentsStorage = StableBTreeMap<string, Student>(0);
const courseRegistrationsStorage = StableBTreeMap<string, CourseRegistration>(0);


export default Server({
    //
    const app = express();
    app.use(express.json());

    // create a course
    app.post('/courses', async (req, res) => {
        const { title, description, cost, status } = req.body;
        const course = new Course();
        course.id = uuidv4();
        course.title = title;
        course.description = description;
        course.cost = cost;
        course.status = status;
        course.createdAt = getCurrentDate();
        course.updatedAt = null;
        await coursesStorage.put(course.id, course);
        res.json(course);
    });

    // get all courses
    app.get('/courses', async (req, res) => {
        const courses = await coursesStorage.values();
        res.json(courses);
    });

    // get a course by id
    app.get('/courses/:id', async (req, res) => {
        const course = await coursesStorage.get(req.params.id);
        if ("None" in course) {
            res.status(404).send(`the course with id=${req.params.id} not found`);
        } else {
            res.json(course.Some);
        }

    });

    // edit a course by id
    app.put('/courses/:id', async (req, res) => {
        const course = await coursesStorage.get(req.params.id);


        if ("None" in course) {
            res.status(400).send(`couldn't update a course with id=${req.params.id}. course not found`);
        } else {
            const { title, description, cost, status } = req.body;
            course.title = title;
            course.description = description;
            course.cost = cost;
            course.status = status;
            course.updatedAt = getCurrentDate();
            await coursesStorage.put(course.id, course);
            res.json(course);
        }
    });

    // delete a course by id
    app.delete('/courses/:id', async (req, res) => {
        await coursesStorage.delete(req.params.id);
        res.json({ message: 'Course deleted' });
    });

    // create an admin
    app.post('/admins', async (req, res) => {
        const { name, email, phone, superAdmin } = req.body;
        const admin = new adminsStorage();
        admin.id = uuidv4();
        admin.name = name;
        admin.email = email;
        admin.phone = phone;
        admin.superAdmin = superAdmin;
        admin.createdAt = getCurrentDate();
        admin.updatedAt = null;
        // save admin to database or perform any other necessary operations
        res.json(admin);
    });

    // get all admins
    app.get('/admins', async (req, res) => {
        // retrieve all admins from the database or perform any other necessary operations
        const admins = await adminsStorage.values();
        
        res.json(admins);
    });

    // get an admin by id
    app.get('/admins/:id', async (req, res) => {
        // retrieve the admin with the specified id from the database or perform any other necessary operations
        const admin = await adminsStorage.get(req.params.id);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).send(`The admin with id=${req.params.id} not found`);
        }
    });

    // update an admin by id
    app.put('/admins/:id', async (req, res) => {
        // retrieve the admin with the specified id from the database or perform any other necessary operations
        const admin = await adminsStorage.get(req.params.id);
        if (admin) {
            const { name, email, phone, superAdmin } = req.body;
            admin.name = name;
            admin.email = email;
            admin.phone = phone;
            admin.superAdmin = superAdmin;
            admin.updatedAt = getCurrentDate();
            // update admin in the database or perform any other necessary operations
            res.json(admin);
        } else {
            res.status(400).send(`Couldn't update the admin with id=${req.params.id}. Admin not found`);
        }
    });

    // delete an admin by id
    app.delete('/admins/:id', async (req, res) => {
        // delete the admin with the specified id from the database or perform any other necessary operations
        await adminsStorage.delete(req.params.id);
        res.json({ message: 'Admin deleted' });
    });

    // create an instructor
    app.post('/instructors', async (req, res) => {
        const { name, email, phone } = req.body;
        const instructor = new Instructor();
        instructor.id = uuidv4();
        instructor.name = name;
        instructor.email = email;
        instructor.phone = phone;
        instructor.createdAt = getCurrentDate();
        instructor.updatedAt = null;
        await instructorsStorage.put(instructor.id, instructor);
        res.json(instructor);
    });

    // get all instructors
    app.get('/instructors', async (req, res) => {
        const instructors = await instructorsStorage.values();
        res.json(instructors);
    });

    // get an instructor by id
    app.get('/instructors/:id', async (req, res) => {
        const instructor = await instructorsStorage.get(req.params.id);
        if (instructor) {
            res.json(instructor);
        } else {
            res.status(404).send(`The instructor with id=${req.params.id} not found`);
        }
    });

    // update an instructor by id
    app.put('/instructors/:id', async (req, res) => {
        const instructor = await instructorsStorage.get(req.params.id);
        if (instructor) {
            const { name, email, phone } = req.body;
            instructor.name = name;
            instructor.email = email;
            instructor.phone = phone;
            instructor.updatedAt = getCurrentDate();
            await instructorsStorage.put(instructor.id, instructor);
            res.json(instructor);
        } else {
            res.status(400).send(`Couldn't update the instructor with id=${req.params.id}. Instructor not found`);
        }
    });

    // delete an instructor by id
    app.delete('/instructors/:id', async (req, res) => {
        await instructorsStorage.delete(req.params.id);
        res.json({ message: 'Instructor deleted' });
    });

    // create a student
    app.post('/students', async (req, res) => {
        const { name, email, phone, walletAddress } = req.body;
        const student = new Student();
        student.id = uuidv4();
        student.name = name;
        student.email = email;
        student.phone = phone;
        student.walletAddress = walletAddress;
        student.createdAt = getCurrentDate();
        student.updatedAt = null;
        // save student to database or perform any other necessary operations
        res.json(student);
    });

    // get all students
    app.get('/students', async (req, res) => {
        const students = await studentsStorage.values();
        res.json(students);
    });

    // get a student by id
    app.get('/students/:id', async (req, res) => {
        const student = await studentsStorage.get(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).send(`The student with id=${req.params.id} not found`);
        }
    });

    // update a student by id
    app.put('/students/:id', async (req, res) => {
        const student = await studentsStorage.get(req.params.id);
        if (student) {
            const { name, email, phone, walletAddress } = req.body;
            student.name = name;
            student.email = email;
            student.phone = phone;
            student.walletAddress = walletAddress;
            student.updatedAt = getCurrentDate();
            await studentsStorage.put(student.id, student);
            res.json(student);
        } else {
            res.status(400).send(`Couldn't update the student with id=${req.params.id}. Student not found`);
        }
    });

    // delete a student by id
    app.delete('/students/:id', async (req, res) => {
        await studentsStorage.delete(req.params.id);
        res.json({ message: 'Student deleted' });
    });

    // for selected code, improve course registration functions with courseRegistrationsStorage

    // create a course registration
    app.post('/course-registrations', async (req, res) => {
        const { courseId, studentId } = req.body;
        const courseRegistration = new CourseRegistration();
        courseRegistration.id = uuidv4();
        courseRegistration.courseId = courseId;
        courseRegistration.studentId = studentId;
        courseRegistration.createdAt = getCurrentDate();
        courseRegistration.updatedAt = null;
        await courseRegistrationsStorage.put(courseRegistration.id, courseRegistration);
        res.json(courseRegistration);
    });

    // get all course registrations
    app.get('/course-registrations', async (req, res) => {
        const courseRegistrations = await courseRegistrationsStorage.values();
        res.json(courseRegistrations);
    });

    // get a course registration by id
    app.get('/course-registrations/:id', async (req, res) => {
        const courseRegistration = await courseRegistrationsStorage.get(req.params.id);
        if (courseRegistration) {
            res.json(courseRegistration);
        } else {
            res.status(404).send(`The course registration with id=${req.params.id} not found`);
        }
    });

    // update a course registration by id
    app.put('/course-registrations/:id', async (req, res) => {
        const courseRegistration = await courseRegistrationsStorage.get(req.params.id);
        if (courseRegistration) {
            const { courseId, studentId } = req.body;
            courseRegistration.courseId = courseId;
            courseRegistration.studentId = studentId;
            courseRegistration.updatedAt = getCurrentDate();
            await courseRegistrationsStorage.put(courseRegistration.id, courseRegistration);
            res.json(courseRegistration);
        } else {
            res.status(400).send(`Couldn't update the course registration with id=${req.params.id}. Course registration not found`);
        }
    });

    // delete a course registration by id
    return app.listen();
});

function getCurrentDate() {
   const timestamp = new Number(ic.time());
   return new Date(timestamp.valueOf() / 1000_000);
}


