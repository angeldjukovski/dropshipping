import { Action } from "common/type/action.enum";
import { CurrentUser } from "common/type/current-user.interface";

export default function generateMetadata (
currentUser : CurrentUser,
action : Action = Action.Create,
) {
switch(action)  {
case Action.Create :
return  {
createdBy : currentUser.email,
updatedBy : currentUser.email,
};
case Action.Update :
return {
updatedBy : currentUser.email,
}
case Action.Update :
return {
deletedBy : currentUser.email,
};
default :
return {
createdBy : currentUser.email
}
}
}