import React from 'react';

function Button({ title, isPrimary = false, onClick }) {
    const style = "px-4 py-2 rounded-lg"
    return (
        <button
            class={isPrimary ? style + " bg-sky-100" : style + " bg-sky-50"}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button;