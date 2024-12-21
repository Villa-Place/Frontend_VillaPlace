const ProfileAdmin = () => {
  return (
    <form action="">
      <div className="max-w-2xl mt-10 mx-auto">
        <div className="flex justify-between mb-8">
          <label
            htmlFor="current-password"
            className="text-md font-semibold text-black dark:text-white"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="current-password"
          />
        </div>
        <div className="flex justify-between mb-8">
          <label
            htmlFor="new-password"
            className="text-md font-semibold text-black dark:text-white"
          >
            Email
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="new-password"
          />
        </div>
        <div className="flex justify-between mb-8">
          <label
            htmlFor="confirm-password"
            className="text-md font-semibold text-black dark:text-white"
          >
            Nomor Telepon
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="confirm-password"
          />
        </div>
        <div className="flex justify-between ">
          <label
            htmlFor="confirm-password"
            className="text-md font-semibold text-black dark:text-white"
          >
            Foto Profile
          </label>
          <div
            id="image-preview"
            className=" max-w-xs p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center text-center cursor-pointer"
          >
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="upload" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-700 mx-auto mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                Unggah Foto
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                Ukuran foto harus kurang dari{" "}
                <b className="text-gray-600">10mb</b>
              </p>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                dan harus berformat{" "}
                <b className="text-gray-600">JPG, PNG, atau JPEG</b>.
              </p>
              <span
                id="filename"
                className="text-gray-500 bg-gray-200 z-50"
              ></span>
            </label>
          </div>
        </div>

        <div className="flex justify-end items-end">
          <button
            type="button"
            className=" flex justify-end focus:outline-none text-white bg-[#089562] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileAdmin;
