import { User } from "next-auth";
import React from "react";

interface SettingsPageProps {
  user: User;
}

const SettingsPage = ({ user }: SettingsPageProps) => {
  return <div>{user.name} Settings</div>;
};

export default SettingsPage;
