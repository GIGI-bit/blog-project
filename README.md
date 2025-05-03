📝 Blog Website
A full-stack blog platform built with Next.js, Supabase, and Tailwind CSS — designed to support multiple users with a modern, clean interface and smooth interactions.

🚀 Features
🔐 Authentication – Sign up and log in with Supabase Auth (default email/password flow)

✍️ Write Blogs – Registered users can create and publish their own blogs

🧹 Manage Content – Users can delete their blogs

🔍 Search – Find blogs by title using a live search input

🗂️ Category Filter – Filter blogs by category

🧩 Pagination – Blogs are shown in chunks; "Show More" and "Show Less" buttons allow dynamic control

⭐ Featured Blog – The most recent blog is displayed in a larger container as a featured post

🧱 Responsive Grid Layout – Other blogs are shown in a grid of smaller cards

🔁 Reusable Logic – Built with custom React hooks

🎨 Styling with Tailwind CSS – Responsive and utility-first styling across the app

🔔 User Feedback – Integrated with Toastify for real-time notifications

🎞️ Enhanced UX – Lottie animations used for loading states

🛠️ Tech Stack
Frontend: Next.js, React

Backend & Auth: Supabase

Styling: Tailwind CSS

UX Enhancements: Toastify, Lottie

State Management: React Hooks.

📄 User Flow
On the homepage, blogs are displayed in a grid layout.

The most recently added blog appears as a featured blog in a larger container.

Users can expand the blog list using the Show More button and collapse it with Show Less.

Unauthenticated users see a registration/login screen.

Logged-in users can create and delete their own blog posts.

Home Page:
![Image](https://github.com/user-attachments/assets/8bfad5a2-2539-4f43-a466-02f3d7f31160)
The most recently added blog is treated as a featured post and displayed in a larger container.

![Image](https://github.com/user-attachments/assets/339b694b-4927-4536-a36e-d9ab053ee0a5)
Other blogs are displayed in smaller containers using a grid layout. Each page initially shows only a limited number of blogs. To view more, users can click the 'Show More' button. After clicking it, a 'Show Less' button appears, allowing users to collapse the view if they wish.

Write a blog Page:
![Image](https://github.com/user-attachments/assets/192d52b5-77c4-4170-bc29-34de26cec20d)
On this page, registered users can write their own blog posts. If the user is not logged in, a registration screen is shown instead.

