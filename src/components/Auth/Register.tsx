import React from "react";

export const Register = () => {
    return (
        <>
            <form>
                <input type="text"/>
                <input type="email"/>
                <input type="password"/>
                <button>Register</button>
                <a href="/login">Already have an account?</a>
            </form>
        </>
    )
}