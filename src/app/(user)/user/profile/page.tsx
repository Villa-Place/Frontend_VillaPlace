import ProfileUser from "@/components/Profile/ProfileUser";

export const metadata = {
  title: "Profile | Villaplace",
};

const Profile = () => {
  return (
    <>
      <div className=" p-2 border-b-2 border-gray-200 mb-5">
        <h1 className="text-lg font-bold">Edit Profile</h1>
      </div>
      <ProfileUser />
    </>
  );
};

export default Profile;
