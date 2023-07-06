const Course = ( {course} ) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {
        course.parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )
      }
      <h4>total of {course.parts.reduce((total, value) => 
                    total + value.exercises, 0)} exercises</h4>
    </div>
  );
};

export default Course