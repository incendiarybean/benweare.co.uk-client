const Documentation = () => {
    return (
        <div className="select-none w-full p-4">
            <div className="w-full">
                <iframe
                    className="h-[135rem] w-full rounded"
                    title="API Documentation"
                    src="http://localhost:8080/api/docs"
                />
            </div>
        </div>
    );
};

export default Documentation;
