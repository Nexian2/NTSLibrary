import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) return alert(error.message);

    // Cek apakah user sudah verif
    if (!data.user.email_confirmed_at) {
        alert("Please verify your email before logging in.");
        return;
    }

    // SUCCESS → redirect
    window.location.href = "/public/index.html";
});
