import React from 'react';


const Header = () => {

    return (
        <header className="bg-white sticky top-0 z-50 shadow-md py-4 px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#4CBB17]">CarboCredit</h1>
            <div>
                <button className="bg-[#4CBB17] text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer mr-2">
                    Connect Wallet
                </button>
                <button className="bg-[#4CBB17] text-white text-lg font-medium px-4 py-2 rounded-xl cursor-pointer">
                    Docs
                </button>
            </div>
        </header>
    );
};

export default Header;