import { Outlet, Navigate } from "react-router-dom";
type ProtectedRoutesProps = {
    isAuthorised: boolean;
}
export default function ProtectedRoutes({isAuthorised}: ProtectedRoutesProps) {
    return isAuthorised ? <Outlet /> : <Navigate to ="/login" />;
};