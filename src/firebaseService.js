import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, updateDoc, getDocs, query, where, arrayUnion, deleteDoc, onSnapshot } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC7AyGz_yKZPMcBUgqWCs6oV6-yvklFws0',
  authDomain: 'attendance-app-7aefe.firebaseapp.com',
  projectId: 'attendance-app-7aefe',
  storageBucket: 'attendance-app-7aefe.appspot.com',
  messagingSenderId: '71551212270',
  appId: '1:71551212270:web:52bbfc06c6993de1abb1ff',
  measurementId: 'G-P3B2Z8FWVF'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addStudent = async (student) => {
  const q = query(collection(db, 'students'), where('studentID', '==', student.studentID));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw new Error('Student ID already exists.');
  }
  await addDoc(collection(db, 'students'), student);
};

export const addAdmin = async (admin) => {
  const q = query(collection(db, 'admins'), where('staffID', '==', admin.staffID));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw new Error('Staff ID already exists.');
  }
  await addDoc(collection(db, 'admins'), admin);
};

export const addCourse = async (course) => {
  await addDoc(collection(db, 'courses'), course);
};

export const joinCourse = async (courseID, student) => {
  const courseRef = doc(db, 'courses', courseID);
  await updateDoc(courseRef, {
    students: arrayUnion(student)
  });
};

export const getCourses = async () => {
  const querySnapshot = await getDocs(collection(db, 'courses'));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

// Function to get real-time updates
export const getCourseListener = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
    const coursesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(coursesList);
  });
  return unsubscribe;
};

export const getStudents = async () => {
  const querySnapshot = await getDocs(collection(db, 'students'));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const authenticateUser = async (collectionName, id, password) => {
  const idField = collectionName === 'admins' ? 'staffID' : 'studentID';
  const q = query(collection(db, collectionName), where(idField, '==', id), where('password', '==', password));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error('Invalid credentials.');
  }
  return querySnapshot.docs[0].data();
};

export const updateAttendance = async (courseID, studentID) => {
  const courseRef = doc(db, 'courses', courseID);
  await updateDoc(courseRef, {
    [`attendance.${studentID}`]: true
  });
};

export const deleteCourseFromDB = async (courseID) => {
  await deleteDoc(doc(db, 'courses', courseID));
};

export default db;
