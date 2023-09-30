import React from 'react';

function Button({ title, onClick }) {
    return (
        <button
            class="bg-sky-100 px-4 py-2 rounded-lg"
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button;