const Documentation = () => {
    return (
        <div className="select-none w-full p-4">
            <div className="w-full">
                <iframe
                    className="h-[135rem] w-full rounded"
                    title="API Documentation"
                    src={process.env.REACT_APP_DOCS_URL || "/api/docs"}
                />
            </div>
        </div>
    );
};

export default Documentation;
