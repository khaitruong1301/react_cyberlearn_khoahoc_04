import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../constants/Cyberbugs/TaskConstants"

const initialState = {
    taskDetailModal:  {
      "priorityTask": {
        "priorityId": 1,
        "priority": "High"
      },
      "taskTypeDetail": {
        "id": 1,
        "taskType": "bug"
      },
      "assigness": [
        {
          "id": 68,
          "avatar": "https://ui-avatars.com/api/?name=khải",
          "name": "khải",
          "alias": "khai"
        },
        {
          "id": 69,
          "avatar": "https://ui-avatars.com/api/?name=thoa",
          "name": "thoa",
          "alias": "thoa"
        }
      ],
      "lstComment": [],
      "taskId": 54,
      "taskName": "task 1",
      "alias": "task-1",
      "description": "<p>Before you start work on an issue, you can set a time or other type of estimate to calculate how much work you believe it'll take to resolve it. Once you've started to work on a specific issue, log time to keep a record of it.</p>\n<p>&nbsp;</p>\n<ul>\n<li>Open the issue and select&nbsp;&bull;&bull;&bull; &gt;&nbsp;Time tracking</li>\n<li>Fill in the<strong>&nbsp;Time Spent</strong>&nbsp;field</li>\n<li>Fill in the <strong>Time Remaining</strong> field and click Save</li>\n</ul>\n<p>&nbsp;</p>\n<h3><u>That's it!</u></h3>\n<h1>💯💯</h1>\n<p>&nbsp;</p>",
      "statusId": "2",
      "originalEstimate": 30,
      "timeTrackingSpent": 10,
      "timeTrackingRemaining": 10,
      "typeId": 1,
      "priorityId": 1,
      "projectId": 109
    }
}




export const TaskReducer = (state = initialState,action) => {
    switch (action.type) {

    case GET_TASK_DETAIL: {
        console.log(action.taskDetailModal);
        return {...state,taskDetailModal:action.taskDetailModal}
    }
    case CHANGE_TASK_MODAL: {
      const {name,value} = action;
      console.log('value',value)
      // console.log(state.taskDetailModal)
      return {...state,taskDetailModal: {...state.taskDetailModal,[name]:value}}
    }

    case CHANGE_ASSIGNESS : {

      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness,action.userSelected];
      // console.log('state',state)
      return {...state}
    }

    case REMOVE_USER_ASSIGN:{

      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
      return {...state}
    }
    default:
        return state
    }
}
