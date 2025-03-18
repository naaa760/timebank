# TimeBank - Skill Exchange Platform

![image](https://github.com/user-attachments/assets/546efc57-19b8-4c66-8b47-2aac90387975)


TimeBank is a modern web application that enables users to exchange services and skills using time as currency. Users can offer their expertise, request services, and build a community based on mutual skill-sharing.

## 🌟 Features

- **Time-Based Currency System**
  - Earn and spend time credits
  - Track balance and transaction history
  - Fair exchange system

- **Service Management**
  - Offer your skills and services
  - Browse available services
  - Categories and tags for easy discovery
  - Detailed service listings with time pricing

- **Real-Time Communication**
  - Live chat with service providers
  - Instant messaging system
  - Message status tracking
  - Emoji reactions and file sharing

- **Community Features**
  - Discussion forums
  - Service reviews and ratings
  - Community activity feed
  - User profiles and reputation system

- **Booking System**
  - Schedule service sessions
  - Manage appointments
  - Calendar integration
  - Booking confirmations

## 🚀 Tech Stack

### Frontend
- Next.js 13+ (React)
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Framer Motion
- ShadcnUI Components
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL (with Neon)
- WebSocket
- JWT Authentication
- Winston Logger

## 🛠️ Installation

## Start the backend server
cd server
npm run dev

## Start the frontend development server
cd client
npm run dev


## 📦 Deployment

### Backend (Render)
- Connect your GitHub repository
- Create a new Web Service
- Set environment variables
- Deploy from main branch

### Frontend (Vercel/Netlify)
- Connect your GitHub repository
- Set environment variables
- Deploy from main branch

## 🌐 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/sync-user` - Sync Clerk user

### Service Endpoints
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `GET /api/services/provider/:providerId` - Get provider services

### Transaction Endpoints
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get user transactions

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile
- `GET /api/users/balance` - Get time balance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Clerk](https://clerk.dev/) for authentication
- [ShadcnUI](https://ui.shadcn.com/) for UI components
- [Neon](https://neon.tech/) for PostgreSQL database
