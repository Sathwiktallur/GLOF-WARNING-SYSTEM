# GLOF-WARNING-SYSTEM
# GLOF Early Warning System 🌊

An AI-based early warning system for Glacial Lake Outburst Floods featuring an interactive 3D globe interface with particle animations. The system displays mock sensor data, risk levels, and predicted flood timelines for various locations, along with preventive measures and emergency information.

![GLOF Early Warning System](./generated-icon.png)

## Features 🌟

- **Interactive 3D Globe Visualization**: Real-time visualization of glacial lakes and their risk levels
- **Risk Assessment System**: Advanced analysis of flood risks based on multiple parameters
- **Particle Background**: Dynamic particle animation for enhanced visual experience
- **Predictive Analytics**: AI-driven flood prediction based on environmental parameters
- **Email Alerts**: Automated notifications for high-risk flood situations
- **Preventive Measures**: Detailed recommendations based on risk levels

## Tech Stack 💻

- **Frontend**: React, Three.js, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Data Visualization**: Three.js for 3D globe rendering
- **State Management**: TanStack Query
- **Email Notifications**: Nodemailer
- **Type Safety**: TypeScript, Zod

## Setup 🛠️

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Features in Detail 📋

### 3D Globe Visualization
- Interactive Earth globe with real-time rendering
- Color-coded markers for different risk levels
- Smooth rotation and interaction

### Risk Assessment
- Input parameters:
  - Latitude/Longitude
  - Rainfall
  - Water Level
  - Humidity
  - Soil Type
- Real-time risk calculation
- Three-level risk classification (Low, Medium, High)

### Preventive Measures
- Priority-based recommendations
- Immediate actions for high-risk situations
- Long-term mitigation strategies

### Email Notifications
- Automated alerts for high-risk predictions
- Detailed flood prediction information
- Emergency response recommendations

## Project Structure 📁

```
glof-warning-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GlobeView.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── PredictionForm.tsx
│   │   │   ├── PreventiveMeasures.tsx
│   │   │   └── RiskIndicator.tsx
│   │   ├── lib/
│   │   │   ├── globe.ts
│   │   │   └── queryClient.ts
│   │   └── pages/
│   │       └── home.tsx
│   └── index.html
├── server/
│   ├── routes.ts
│   ├── storage.ts
│   └── index.ts
└── shared/
    └── schema.ts
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments 🙏

- Three.js for 3D visualization
- React and TailwindCSS for UI components
- Express.js for backend services
- All contributors and maintainers

## Future Enhancements 🚀

- Real-time data integration with weather APIs
- Machine learning model integration for risk assessment
- Advanced visualization of environmental parameters
- Emergency notification system
- Historical GLOF event analysis

## Contact 📧

For any queries or suggestions, please open an issue in the repository.
