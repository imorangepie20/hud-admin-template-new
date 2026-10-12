import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PageLoader from './components/common/PageLoader'

// 페이지는 라우트별로 코드 분할해 필요할 때만 불러온다

// Dashboard
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Analytics = lazy(() => import('./pages/dashboard/Analytics'))

// Email
const EmailInbox = lazy(() => import('./pages/email/EmailInbox'))
const EmailCompose = lazy(() => import('./pages/email/EmailCompose'))
const EmailDetail = lazy(() => import('./pages/email/EmailDetail'))

// Core Pages
const Widgets = lazy(() => import('./pages/Widgets'))
const Profile = lazy(() => import('./pages/Profile'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Settings = lazy(() => import('./pages/Settings'))
const ScrumBoard = lazy(() => import('./pages/ScrumBoard'))
const Products = lazy(() => import('./pages/Products'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Gallery = lazy(() => import('./pages/Gallery'))

// Auth
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

// AI Studio
const AiChat = lazy(() => import('./pages/ai/AiChat'))
const AiImageGenerator = lazy(() => import('./pages/ai/AiImageGenerator'))

// POS System
const PosCustomerOrder = lazy(() => import('./pages/pos/PosCustomerOrder'))
const PosKitchenOrder = lazy(() => import('./pages/pos/PosKitchenOrder'))
const PosCounterCheckout = lazy(() => import('./pages/pos/PosCounterCheckout'))
const PosTableBooking = lazy(() => import('./pages/pos/PosTableBooking'))
const PosMenuStock = lazy(() => import('./pages/pos/PosMenuStock'))

// UI Components
const UiBootstrap = lazy(() => import('./pages/ui/UiBootstrap'))
const UiButtons = lazy(() => import('./pages/ui/UiButtons'))
const UiCard = lazy(() => import('./pages/ui/UiCard'))
const UiIcons = lazy(() => import('./pages/ui/UiIcons'))
const UiModalNotification = lazy(() => import('./pages/ui/UiModalNotification'))
const UiTypography = lazy(() => import('./pages/ui/UiTypography'))
const UiTabsAccordions = lazy(() => import('./pages/ui/UiTabsAccordions'))

// Forms
const FormElements = lazy(() => import('./pages/forms/FormElements'))
const FormPlugins = lazy(() => import('./pages/forms/FormPlugins'))
const FormWizards = lazy(() => import('./pages/forms/FormWizards'))

// Tables
const TableElements = lazy(() => import('./pages/tables/TableElements'))
const TablePlugins = lazy(() => import('./pages/tables/TablePlugins'))

// Charts
const ChartJs = lazy(() => import('./pages/charts/ChartJs'))

// Misc Pages
const Error404 = lazy(() => import('./pages/Error404'))
const ComingSoon = lazy(() => import('./pages/ComingSoon'))

function App() {
    return (
        <Router>
            <Suspense fallback={<PageLoader fullScreen />}>
                <Routes>
                    {/* Auth Pages (No Layout) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                    <Route path="/404" element={<Error404 />} />

                    {/* Main Layout Pages */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="analytics" element={<Analytics />} />

                        {/* Email */}
                        <Route path="email/inbox" element={<EmailInbox />} />
                        <Route path="email/compose" element={<EmailCompose />} />
                        <Route path="email/detail/:id" element={<EmailDetail />} />

                        {/* Core Pages */}
                        <Route path="widgets" element={<Widgets />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="scrum-board" element={<ScrumBoard />} />
                        <Route path="products" element={<Products />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="gallery" element={<Gallery />} />

                        {/* AI Studio */}
                        <Route path="ai/chat" element={<AiChat />} />
                        <Route path="ai/image-generator" element={<AiImageGenerator />} />

                        {/* POS System */}
                        <Route path="pos/customer-order" element={<PosCustomerOrder />} />
                        <Route path="pos/kitchen-order" element={<PosKitchenOrder />} />
                        <Route path="pos/counter-checkout" element={<PosCounterCheckout />} />
                        <Route path="pos/table-booking" element={<PosTableBooking />} />
                        <Route path="pos/menu-stock" element={<PosMenuStock />} />

                        {/* UI Components */}
                        <Route path="ui/bootstrap" element={<UiBootstrap />} />
                        <Route path="ui/buttons" element={<UiButtons />} />
                        <Route path="ui/card" element={<UiCard />} />
                        <Route path="ui/icons" element={<UiIcons />} />
                        <Route path="ui/modal-notification" element={<UiModalNotification />} />
                        <Route path="ui/typography" element={<UiTypography />} />
                        <Route path="ui/tabs-accordions" element={<UiTabsAccordions />} />

                        {/* Forms */}
                        <Route path="form/elements" element={<FormElements />} />
                        <Route path="form/plugins" element={<FormPlugins />} />
                        <Route path="form/wizards" element={<FormWizards />} />

                        {/* Tables */}
                        <Route path="table/elements" element={<TableElements />} />
                        <Route path="table/plugins" element={<TablePlugins />} />

                        {/* Charts */}
                        <Route path="chart/chartjs" element={<ChartJs />} />
                    </Route>

                    {/* 404 Fallback */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
