const FileVerif = (props) => {
    const { title, name, document, handleChangeFile } = props;
    return (
        <div className="flex flex-col gap-1 w-full lg:w-[32%]">
            <div className="flex justify-between items-center">
                <label htmlFor={name} className="text-black/80">
                    {title}
                </label>
            </div>
            <div
                className={`${
                    document[name]?.name && "border-primary"
                } border-dashed overflow-hidden px-2 border bg-light flex relative justify-center items-center border-accent rounded-md h-28`}
            >
                <h1
                    className={`text-sm lg:text-base font-medium text-accent ${
                        document[name]?.name && "text-black/70"
                    }`}
                >
                    {document[name]?.name || "Upload your file"}
                </h1>
                <input
                    type="file"
                    id={name}
                    name={name}
                    onChange={handleChangeFile}
                    accept=".pdf"
                    className={`absolute w-full h-full opacity-0 cursor-pointer`}
                />
            </div>
        </div>
    );
};

export default FileVerif;
