import React from 'react';

const Reservations = () => {
    return (
        <div id="reservations" className="p-2">
            {/* write your code here */}
            <h4 className="text-2xl font-bold mb-5">Make reservation</h4>
            <div className="bg-gray-300/20 rounded-md p-10">
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col">
                        <h5 className="font-bold mb-1">Title</h5>
                        <input type="text " className="bg-white w-full py-2 px-2" />
                    </div>
                    <div className="flex flex-col">
                        <h5 className="font-bold mb-1">Description</h5>
                        <textarea rows={5} type="text " className="bg-white w-full py-2 px-2" />
                        <small className="mt-1.5 text-neutral-500">
                            Please write a brief summary of your meeting
                        </small>
                    </div>
                    <div className="flex flex-col">
                        <h5 className="font-bold mb-1">Boardroom</h5>
                        <input
                            type="text"
                            disabled
                            placeholder="CBRD BOARDROOM"
                            className="bg-white w-full py-2 px-2"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gray-300/20 mt-10 p-10 rounded-md">
                <div className="flex items-center space-x-10">
                    <div className="flex items-center space-x-5">
                        <div className="flex flex-col">
                            <h5 className="font-bold mb-1">Start Date</h5>
                            <input
                                type="text"
                                disabled
                                placeholder="Select date"
                                className="bg-white w-full py-2 px-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="font-bold mb-1">Start Time</h5>
                            <input
                                type="text"
                                disabled
                                placeholder="Select time"
                                className="bg-white w-full py-2 px-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-5">
                        <div className="flex flex-col">
                            <h5 className="font-bold mb-1">Start Date</h5>
                            <input
                                type="text"
                                disabled
                                placeholder="Select date"
                                className="bg-white w-full py-2 px-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="font-bold mb-1">Start Time</h5>
                            <input
                                type="text"
                                disabled
                                placeholder="Select time"
                                className="bg-white w-full py-2 px-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-300/20 mt-10 p-10 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2 space-x-2 flex">
                        <h3>Select Attendees</h3>
                        <input
                            type="text"
                            placeholder="Add attendee by name, email or username..."
                            className="bg-white w-full py-2 px-2"
                        />
                    </div>
                    <button className="w-full bg-blue hover:bg-blue/80 p-3 rounded-md text-white font-semibold">
                        Add +
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 mt-10 gap-8">
                    <div className="bg-blue/50 p-3 rounded-full text-white">
                        <div className="flex items-center justify-between px-5">
                            <span>email@example.com</span>
                            <button>x</button>
                        </div>
                    </div>
                    <div className="bg-blue/50 p-3 rounded-full text-white">
                        <div className="flex items-center justify-between px-5">
                            <span>email@example.com</span>
                            <button>x</button>
                        </div>
                    </div>
                    <div className="bg-blue/50 p-3 rounded-full text-white">
                        <div className="flex items-center justify-between px-5">
                            <span>email@example.com</span>
                            <button>x</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-300/20 rounded-md p-10 flex space-x-10 mt-10">
                <h5 className="font-bold mb-1">Start Date</h5>
                <p>A meeting is urgent when it is set to take place in less than an hour</p>
                <div class="flex items-center">
                    <input type="checkbox" />
                </div>
            </div>
        </div>
    );
};

export default Reservations;
