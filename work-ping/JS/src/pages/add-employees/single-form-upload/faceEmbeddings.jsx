import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from 'react-bootstrap'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { tabContents } from './components/tabContents'

const FaceEmbeddings = () => {
  return (
    <ComponentContainerCard id="pills-justify" title="Face Embeding" description={<></>}>
      <TabContainer defaultActiveKey={'1'}>
        <Nav as="ul" variant="pills" justify className="p-1">
          {tabContents.map((tab, idx) => (
            <NavItem as="li" key={idx}>
              <NavLink eventKey={tab.id}>
                <IconifyIcon icon={tab.icon} className="me-2" />
                {tab.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <TabContent className="pt-3">
          {tabContents.map((tab, idx) => (
            <TabPane eventKey={tab.id} key={idx}>
              {tab.component}
            </TabPane>
          ))}
        </TabContent>
      </TabContainer>
    </ComponentContainerCard>
  )
}
export default FaceEmbeddings
