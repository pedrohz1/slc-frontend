import React from 'react';

function Loading() {
    return (
        <div className=' d-flex align-items-center' style={{ minHeight: 'calc(100vh - 100px)' }}>
            <div className="progress w-75 rounded-pill" style={{ height: '20px' }}>
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: '100%' }}
                ></div>
            </div>
        </div>
    );
}

export default Loading;
