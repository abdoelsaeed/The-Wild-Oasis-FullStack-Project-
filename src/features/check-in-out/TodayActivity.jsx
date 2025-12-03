import styled from "styled-components";
import { box } from "../../styles/styles";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { useTodayActivity } from "./useTodayActivity";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  ${box}
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivate() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading type="h2">Today</Heading>
        {/* Through the 'as' props, we make the button Polymorphic! Built-in into styled components. The polymorphic component pattern comes in handy when we need flexibility on the rendered HTML element. */}
        {/* id of -1 means there is no ID, which means a new booking will be made for a new guest */}
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities?.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivate;

