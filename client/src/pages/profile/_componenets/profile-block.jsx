import ProfileTop from './profile-top';
import ProfileBottom from './profile-bottom';

export default function ProfileBlock() {
    return (
        <div className='space-y-4'>
            <ProfileTop />
            <ProfileBottom />
        </div>
    )
}