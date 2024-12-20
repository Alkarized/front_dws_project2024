import BackButton from "../dashboard/BackButton";
import LogoutButton from "../auth/LogoutButton";
import {Container} from "@mui/material";
import UsersTable from "./table/UsersTable";

const UserPage = () => {

    return (
        <>
            <Container component="main">
                <BackButton/>
                <UsersTable/>
                <LogoutButton/>
            </Container>
        </>
    );
};

export default UserPage;