const Loader = () => {
  return (
    <div className="flex h-auto items-center justify-center bg-transparent">
      <div
        className={`h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
