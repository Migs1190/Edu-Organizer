import type { Workbook } from "../../../types";

type Student = { id: string; name: string };

const eliminateDuplicates = (workbook: Workbook[], setFinalWorkbook) => {
  const subjectsMap = new Map();

  //Loop through each subject of the workbook
  for (const subject of workbook) {
    //Is the subject is already in the map?
    if (subjectsMap.has(subject.subjectCode)) {
      //Yes? Store the subject in a variable
      const existingSubject = subjectsMap.get(subject.subjectCode);

      //If the subject has no enrolled students, continue to the next subject -- TypeScript
      if (subject.enrolledStudents === undefined) continue;
      //Loop through the enrolled students of the subject
      for (const student of subject.enrolledStudents) {
        //Is the student already enrolled in the subject?
        if (!existingSubject.enrolledStudents.some((s: Student) => s.id === student.id)) {
          //No? Add the student to the subject
          existingSubject.enrolledStudents.push(student);
        }
      }
    } else {
      //No? Add the subject to the map
      subjectsMap.set(subject.subjectCode, { ...subject });
    }
  }
  //Convert the map to an array
  const mergedWorkbook = Array.from(subjectsMap.values());
  //Set the final workbook to the merged workbook
  setFinalWorkbook(mergedWorkbook);
};
export default eliminateDuplicates;
