import Grid from "@mui/material/Grid";
import NotificationList from './notificationList';
import TodoList from './todoList';
import ProfileCard from "./profileCard";
import profileImage from "../../data/profile-image.png"
import TimeTrackerCard from "./timeTrackerCard";
import TimeTrackerReportCard from "./timeTrackerReportCard";
import FinancialReportCard from "./financialReportCard";
import ServiceCounterCard from "./serviceCounterCard";
import SalaryCard from "./salaryCard";
import NutritionCard from "./nutritionCard";

const homePage = (
    <Grid container spacing={3}>
        <Grid item container direction="column" xs={4} spacing={3}>
            <Grid item>
                <ProfileCard profile={{
                    image: profileImage,
                    name: "Diyar Hamedi",
                    company: "404! Group",
                    role: "React Developer",
                    birthDate: "2002-8-18",
                    phoneNumber: "+98 930 454 3403",
                    email: "diyar_hamedi@comp.iust.ac.ir",
                    joinDate: "2022-2-23",
                    }}
                />
            </Grid>
            <Grid item>
                <TimeTrackerCard
                    time={{hours: 2, minutes: 18}}
                    expected={{hours: 8, minutes: 0}}
                    running={false}
                />
            </Grid>
            <Grid item>
                <NutritionCard />
            </Grid>
        </Grid>
        <Grid item xs={4}>
            <NotificationList notifications={[
                {title: "very long title which shows multiline titles are supported", date: "4-20"},
                {title: "Title", date: "4-20"},
                {title: "Title", date: "4-20"},
                {title: "Title", date: "4-20"},
                {title: "Title", date: "4-20"},
            ]}/>
        </Grid>
        <Grid item xs={4}>
            <TodoList todos={[
                {title: "Title", priority: "low", done: true},
                {title: "Title", priority: "lds", done: false},
                {title: "Title", priority: "high", done: false},
                {title: "Title", priority: "medium", done: true},
                {title: "Title", priority: "high", done: true},
            ]}/>
        </Grid>
    </Grid>
);

const reportsPage = (
    <Grid container spacing={3}>
        <Grid item container direction="column" xs={6} spacing={3}>
            <Grid item>
                <TimeTrackerReportCard />
            </Grid>
            <Grid item>
                <ServiceCounterCard />
            </Grid>
        </Grid>
        <Grid item container direction="column" xs={6} spacing={3}>
            <Grid item>
                <FinancialReportCard />
            </Grid>
            <Grid item>
                <SalaryCard />
            </Grid>
        </Grid>
    </Grid>
);

export {homePage, reportsPage} ;