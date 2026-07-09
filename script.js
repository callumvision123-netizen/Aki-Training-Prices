// ======================================
// TOP 6 EUROPE | AKI
// script.js
// ======================================

// ===== Initialize Supabase Visitor Counter =====

const SUPABASE_URL = 'https://qlmgetwhlranhumhyavg.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWdldHdobHJhbmh1bWh5YXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5Nzk5MDcsImV4cCI6MjAzNTU1NTkwN30.pCiQFoqBaa1XluGFOjjzR_9qV21BpOXQY99XZYAudM'; 

// Changed 'const supabase' to 'const SupabaseClient' to fix the initialization error!
const SupabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function trackVisitor() {
    try {
        // 1. Tell Supabase to record a new visit
        const { data, error } = await SupabaseClient.rpc('increment_visitor_count');
        
        if (error) throw error;

        // 2. Update the counter element text with the new total
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            counterElement.innerText = `${data.toLocaleString()} Players Visited`;
        }
    } catch (err) {
        console.error('Error tracking visitor:', err);
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) counterElement.innerText = 'Online';
    }
}

// Run the counter setup immediately when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    trackVisitor();
});

// ===== Scroll Reveal =====

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".card,.paypal,.hero,.sectionTitle").forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "0.8s ease";

    observer.observe(el);

});

// ===== Mouse Glow =====

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "350px";
glow.style.height = "350px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background =
"radial-gradient(circle, rgba(0,140,255,.20) 0%, rgba(0,140,255,0) 70%)";

glow.style.transform = "translate(-50%,-50%)";
glow.style.zIndex = "-1";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// ===== Copy Discord Username =====

function copyDiscord() {

    navigator.clipboard.writeText("saint.aki.");

    alert(
`Discord username copied!

Username:
saint.aki.

After buying your package, DM me and include:

• Roblox Username
• Package Purchased
• Proof of Payment`
    );

}

// ===== Smooth Navbar Highlight =====

const links = document.querySelectorAll(".navButtons a");

links.forEach(link => {

    link.addEventListener("mouseenter", () => {

        link.style.color = "#55aaff";

    });

    link.addEventListener("mouseleave", () => {

        link.style.color = "white";

    });

});

// ===== Hero Title Animation =====

const heroTitle = document.querySelector(".hero h1");

setInterval(() => {

    if (heroTitle) {
        heroTitle.style.transform = "scale(1.03)";

        setTimeout(() => {
            heroTitle.style.transform = "scale(1)";
        }, 400);
    }

}, 2500);

// ===== Loading Screen =====

window.addEventListener("load", () => {

    const loader = document.createElement("div");

    loader.innerHTML = `
        <h1>AKI</h1>
        <p>TOP 6 EUROPE</p>
    `;

    loader.style.position = "fixed";
    loader.style.inset = "0";
    loader.style.background = "#05070d";
    loader.style.display = "flex";
    loader.style.flexDirection = "column";
    loader.style.justifyContent = "center";
    loader.style.alignItems = "center";
    loader.style.zIndex = "999999";
    loader.style.transition = "opacity .8s";

    loader.querySelector("h1").style.fontSize = "80px";
    loader.querySelector("h1").style.fontFamily = "Orbitron";
    loader.querySelector("h1").style.color = "#4da3ff";
    loader.querySelector("h1").style.textShadow = "0 0 40px #008cff";

    loader.querySelector("p").style.marginTop = "10px";
    loader.querySelector("p").style.color = "#8bc5ff";
    loader.querySelector("p").style.fontSize = "22px";
    loader.querySelector("p").style.letterSpacing = "6px";

    document.body.appendChild(loader);

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        }, 800);

    }, 1200);

});

// ===== Floating Effect On Cards =====

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 20;
        const rotateX = -(y - rect.height / 2) / 20;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});
