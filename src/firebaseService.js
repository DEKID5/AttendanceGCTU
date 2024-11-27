import { db } from './firebaseConfig';
import { collection, doc, setDoc, getDocs, updateDoc } from 'firebase/firestore';

// Function to add a student with a specific ID
const addStudent = async (student) => {
  try {
    await setDoc(doc(db, 'students', student.studentID), student);
    console.log('Student added:', student);
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

// Function to add an admin with a specific ID
const addAdmin = async (admin) => {
  try {
    await setDoc(doc(db, 'admins', admin.staffID), admin);
    console.log('Admin added:', admin);
  } catch (error) {
    console.error('Error adding admin:', error);
  }
};

// Function to add a course with a specific ID
const addCourse = async (course) => {
  try {
    await setDoc(doc(db, 'courses', course.courseID), course);
    console.log('Course added:', course);
  } catch (error) {
    console.error('Error adding course:', error);
  }
};

// Function to get all students
const getStudents = async () => {
  try {
    const studentsCollection = collection(db, 'students');
    const studentSnapshot = await getDocs(studentsCollection);
    const studentList = studentSnapshot.docs.map(doc => doc.data());
    return studentList;
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
};

// Function to get all admins
const getAdmins = async () => {
  try {
    const adminsCollection = collection(db, 'admins');
    const adminSnapshot = await getDocs(adminsCollection);
    const adminList = adminSnapshot.docs.map(doc => doc.data());
    return adminList;
  } catch (error) {
    console.error('Error getting admins:', error);
    return [];
  }
};

// Function to get all courses
const getCourses = async () => {
  try {
    const coursesCollection = collection(db, 'courses');
    const courseSnapshot = await getDocs(coursesCollection);
    const courseList = courseSnapshot.docs.map(doc => doc.data());
    return courseList;
  } catch (error) {
    console.error('Error getting courses:', error);
    return [];
  }
};

// Function to update a course
const updateCourse = async (courseID, courseData) => {
  try {
    const courseRef = doc(db, 'courses', courseID);
    await updateDoc(courseRef, courseData);
    console.log('Course updated:', courseData);
  } catch (error) {
    console.error('Error updating course:', error);
  }
};

export { addStudent, addAdmin, addCourse, getStudents, getAdmins, getCourses, updateCourse };
