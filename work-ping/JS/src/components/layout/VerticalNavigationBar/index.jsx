import { lazy, Suspense } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FallbackLoading from '@/components/FallbackLoading'
import LogoBox from '@/components/LogoBox'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { getMenuItems } from '@/helpers/menu'
import HoverMenuToggle from './components/HoverMenuToggle'

const AppMenu = lazy(() => import('./components/AppMenu'))

const VerticalNavigationBar = () => {
  const menuItems = getMenuItems()
  const navigate = useNavigate()

  return (
    <div className="main-nav d-flex flex-column" id="leftside-menu-container">
      <LogoBox
        containerClassName="logo-box"
        squareLogo={{ className: 'logo-sm' }}
        textLogo={{ className: 'logo-lg' }}
      />

      <HoverMenuToggle />

      <SimplebarReactClient className="scrollbar flex-grow-1">
        <Suspense fallback={<FallbackLoading />}>
          <AppMenu menuItems={menuItems} />
        </Suspense>
      </SimplebarReactClient>

      
      <div className="p-3 border-top">
        <Button
          variant="primary"
          className="w-100"
          onClick={() => navigate('/organization/organization-details')}
        >
          + Add Organization
        </Button>
      </div>
    </div>
  )
}

export default VerticalNavigationBar
