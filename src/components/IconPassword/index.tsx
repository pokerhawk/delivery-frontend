import * as S from './styles'

import EyeIcon from '../../assets/icons/Eye'
import EyeOffIcon from '../../assets/icons/EyeOff'

type IconPasswordProps = {
  visible: boolean
  onChangeVisible: () => void
}

const IconPassword = ({ visible, onChangeVisible }: IconPasswordProps) => {
  return (
    <S.Wrapper onClick={onChangeVisible}>
      {visible && <EyeIcon />}
      {!visible && <EyeOffIcon />}
    </S.Wrapper>
  )
}

export default IconPassword
