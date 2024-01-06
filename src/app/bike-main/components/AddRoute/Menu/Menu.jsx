import { Image, Preview, RssFeed, Settings } from '@mui/icons-material'
import { Stack, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, styled } from '@mui/material'
import { useSelector } from 'react-redux';

const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 25
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#B6E388',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#B6E388',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props) {

  const { primary } = useSelector(state => state.theme)

  const { active, completed, icon } = props;

  const icons = {
    1: <Settings />,
    2: <RssFeed />,
    3: <Image />,
    4: <Preview />,
  };

  return (
    <div
      style={{
        backgroundColor: '#ccc', zIndex: 1, color: '#fff', width: 50, height: 50,
        borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
        ...(active && {
          backgroundColor: primary,
        }),
        ...(completed && {
          backgroundColor: primary,
        }),
      }}>
      {icons[String(icon)]}
    </div>
  );
}

export const Menu = ({ handleStep, activeStep, icons }) => {

  const onClickHandleStep = (index) => () => {
    handleStep(index)
  }

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {
            icons.map((icon, index) => (
              <Step key={icon.text} onClick={onClickHandleStep(index)}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{icon.text}</StepLabel>
              </Step>
            ))
          }
        </Stepper>
      </Stack>
    </>
  )
}
