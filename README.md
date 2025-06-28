# React Native Todo App 📱

A feature-rich Todo application built with React Native, Expo, and TypeScript. This app demonstrates modern React Native development practices including state management, native modules, local database storage, and responsive UI design.

## Features ✨

- **Todo Management**: Create, edit, delete, and mark todos as complete
- **Contact Integration**: Import and manage device contacts using native modules
- **Local Database**: SQLite storage for todos and contacts
- **Theme Support**: Dark and light mode with automatic switching
- **Responsive Design**: Modern UI with NativeWind (Tailwind CSS for React Native)
- **State Management**: Redux Toolkit for global state management
- **File-based Routing**: Expo Router for seamless navigation
- **Testing**: Jest setup for unit testing
- **TypeScript**: Full type safety throughout the application

## Tech Stack 🛠️

### Core Technologies
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing system

### State Management & Data
- **Redux Toolkit** - Global state management
- **Expo SQLite** - Local database storage
- **AsyncStorage** - Persistent storage

### UI & Styling
- **NativeWind** - Tailwind CSS for React Native
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **Expo Vector Icons** - Icon library

### Development Tools
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Setup 🚀

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learn-rn-todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

### Running the App

- **iOS Simulator**: Press `i` in the terminal or scan QR code with Expo Go
- **Android Emulator**: Press `a` in the terminal or scan QR code with Expo Go
- **Physical Device**: Scan the QR code with Expo Go app

### Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint
```

## Project Structure 📁

```
src/
├── app/                    # Expo Router screens and navigation
│   ├── _layout.tsx        # Root layout component
│   ├── home.tsx           # Main todo screen
│   ├── login.tsx          # Authentication screen
│   ├── contact.tsx        # Contact management screen
│   └── [id].tsx           # Dynamic todo detail screen
├── component/             # Reusable UI components
│   ├── item.tsx           # Todo item component
│   └── clock.tsx          # Clock display component
├── store/                 # Redux store and slices
│   ├── store.ts           # Redux store configuration
│   ├── todoSlice.ts       # Todo state management
│   └── contactStore.ts    # Contact state management
├── database/              # Database layer
│   ├── appDatabase.ts     # Database initialization
│   ├── todoDatabase.ts    # Todo database operations
│   ├── contactDatabase.ts # Contact database operations
│   └── storage.ts         # AsyncStorage utilities
├── bridges/               # Native module bridges
│   └── contactModule.tsx  # Contact native module
├── provider/              # Context providers
│   └── themeProvider.tsx  # Theme context provider
└── tests/                 # Test files
    ├── component/         # Component tests
    ├── database/          # Database tests
    └── store/             # Store tests
```

## Key Features Implementation 🔧

### Todo Management
- Redux Toolkit for state management
- SQLite database for persistence
- CRUD operations with optimistic updates
- Pull-to-refresh functionality

### Contact Integration
- Native module bridge for device contacts
- Automatic contact import on first launch
- Contact database storage
- Contact management interface

### Theme System
- Context-based theme management
- Dark/light mode toggle
- Persistent theme preference
- Responsive color schemes

### Database Architecture
- SQLite for structured data storage
- AsyncStorage for simple key-value pairs
- Database initialization and migration
- Error handling and recovery

## Testing 🧪

The project includes comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Test files are organized to mirror the source structure:
- Component tests for UI components
- Database tests for data operations
- Store tests for Redux logic

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More 📚

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router Documentation](https://expo.github.io/router/)
