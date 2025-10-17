from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to register page and create a new user
    page.goto("http://localhost:3000/html/register.html")
    page.screenshot(path="jules-scratch/verification/01_register_page.png")
    page.fill("input#username", "testuser4")
    page.fill("input#password", "password123")
    page.fill("input#confirm-password", "password123")
    page.click("button.btn-auth", force=True)
    page.wait_for_url("http://localhost:3000/html/login.html")
    page.screenshot(path="jules-scratch/verification/02_after_register.png")

    # Go to login page and login
    page.goto("http://localhost:3000/html/login.html")
    page.fill("input#username", "testuser4")
    page.fill("input#password", "password123")
    page.click("button.btn-auth", force=True)
    page.wait_for_url("http://localhost:3000/html/index.html")
    page.screenshot(path="jules-scratch/verification/03_dashboard.png")

    # Logout
    page.wait_for_selector("#log_out")
    page.click("#log_out")
    page.wait_for_url("http://localhost:3000/html/login.html")
    page.screenshot(path="jules-scratch/verification/04_after_logout.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)