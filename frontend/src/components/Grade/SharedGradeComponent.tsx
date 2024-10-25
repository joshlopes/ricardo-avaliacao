import React from 'react';
import {GradeEnum} from "../../types/Grade";

interface SharedGradeProps {
    value: GradeEnum;
}

const SharedGrade: React.FC<SharedGradeProps> = ({ value }) => {
    switch(value) {
        case GradeEnum.MASTERED:
            return (<>Mastered</>)
        case GradeEnum.ACHIEVED:
            return (<>Achieved</>)
        case GradeEnum.IN_PROGRESS:
            return (<>In progress</>)
        case GradeEnum.EMERGENT:
            return (<>Emergent</>)
        case GradeEnum.NOT_WORKED:
            return (<>Not worked</>)
    }
}

export default SharedGrade;