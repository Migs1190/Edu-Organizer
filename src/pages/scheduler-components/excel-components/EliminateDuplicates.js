/**
 * The `eliminateDuplicates` function takes a workbook array and merges subjects with the same subject
 * code, eliminating duplicate enrolled students, and updates the final workbook using the
 * `setFinalWorkbook` function.
 */
const eliminateDuplicates = (workbook, setFinalWorkbook) => {
  const subjectsMap = new Map();

  for (const subject of workbook) {
    if (subjectsMap.has(subject.subjectCode)) {
      const existingSubject = subjectsMap.get(subject.subjectCode);
      for (const student of subject.enrolledStudents) {
        if (!existingSubject.enrolledStudents.some((s) => s.id === student.id)) {
          existingSubject.enrolledStudents.push(student);
        }
      }
    } else {
      subjectsMap.set(subject.subjectCode, { ...subject });
    }
  }

  const mergedWorkbook = Array.from(subjectsMap.values());
  setFinalWorkbook(mergedWorkbook);
};
export default eliminateDuplicates;
