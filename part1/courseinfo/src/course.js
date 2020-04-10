import React from "react";

const Part = ({name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
};

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(({id, name, exercises}) => <Part key={id} name={name} exercises={exercises}/>)}
        </div>
    )
};

const Header = ({name}) => {
    return (
        <h1>{name}</h1>
    )
};

const Course = ({course}) => {
    const {name, parts} = course;
    const totalExercises = parts.reduce((p, n) => p + n.exercises, 0);
    return (
        <div>
            <Header name={name}/>
            <Content parts={parts}/>
            <b>total of {totalExercises} exercises</b>
        </div>
    )
};

export default Course;