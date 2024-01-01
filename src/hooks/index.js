import { useDispatch, useSelector, useStore } from "react-redux";

export * from "./useCheckAuth";
export * from "./useForm";
export * from "./useSearch";

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
