import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (password !== confirm) {
        alert("Passwords do not match");
        return;
    }

    // === SIGN UP + EMAIL VERIFICATION ===
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/public/verified.html`
        }
    });

    if (error) return alert(error.message);

    // Insert profile
    const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        fullname,
        username,
        email
    });

    if (profileError) return alert(profileError.message);

    alert("Account created! Check your email to verify your account.");
    window.location.href = "/public/Login.html";
});
