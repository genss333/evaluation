import { UserRole } from "@/models/user-role";

export interface ProbationPageProps {
  params: Promise<UserRole>;
}

const ProbationPage = async ({ params }: ProbationPageProps) => {
  const { role } = await params;
  return <div>{role}</div>;
};

export default ProbationPage;
