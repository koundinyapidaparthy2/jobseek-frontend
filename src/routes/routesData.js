import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));
const ProfessionalInfo = lazy(() => import("../pages/ProfessionalInfo"));
const ResumeTemplates = lazy(() => import("../pages/ResumeTemplates"));
const CoverLetterTemplates = lazy(() =>
  import("../pages/CoverLetterTemplates")
);
const LinkedInMessages = lazy(() => import("../pages/LinkedInMessages"));
const EmailTemplates = lazy(() => import("../pages/EmailTemplates"));
const CustomTemplates = lazy(() => import("../pages/CustomTemplates"));
const AIWorkspace = lazy(() => import("../pages/AIWorkspace"));

export const publicRoutes = [
  { path: "/login", element: Login, label: "Login" },
  { path: "/signup", element: Signup, label: "Signup" },
];

export const templatesMenu = [
  { path: "/resume-templates", label: "Resume", element: ResumeTemplates },
  {
    path: "/cover-letter-templates",
    label: "Cover Letter",
    element: CoverLetterTemplates,
  },
  { path: "/linkedin-messages", label: "LinkedIn", element: LinkedInMessages },
  { path: "/email-templates", label: "Email", element: EmailTemplates },
];

export const privateRoutes = [
  { path: "/dashboard", element: Dashboard, label: "Dashboard" },
  { path: "/profile", element: Profile, label: "Profile" },
  {
    path: "/professional-info",
    element: ProfessionalInfo,
    label: "Professional Info",
  },
  ...templatesMenu,
  { path: "/custom-templates", element: CustomTemplates, label: "Custom" },
  { path: "/ai-workspace", element: AIWorkspace, label: "AI Workspace" },
];
