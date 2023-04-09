import { useAppSelector } from "./useAppSelector";
import { selectIsNewUser } from "redux/auth/selectors";

export const useNewUser = () => useAppSelector(selectIsNewUser);