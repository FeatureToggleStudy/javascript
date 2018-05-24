import { connect } from "react-redux";
import ProfilePage from "../components/ProfilePage";
import {
	profileUpdateEmail,
	passwordResetSend,
	disableUser,
	updateProfile,
	resetSaveMessage,
} from "../actions/user";
import {
	createComposerToken, createTokenModalClosed, createTokenModalOpen, deleteComposerToken,
	fetchComposerTokens, manageTokenModalClosed, manageTokenModalOpen, renameComposerToken,
} from "../actions/composerTokens";
import {
	getNewsletterStatus, subscribeNewsletter, unsubscribeNewsletter,
} from "../actions/newsletter";

let avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

export const mapStateToProps = ( state ) => {
	return {
		email: state.user.data.profile.email,
		userFirstName: state.user.data.profile.userFirstName,
		userLastName: state.user.data.profile.userLastName,
		composerTokens: Object.values( state.entities.composerTokens.byId ),
		image: avatarPlaceholder,
		isSaving: state.user.savingProfile,
		isSaved: state.user.profileSaved,
		isDeleting: state.user.deletingProfile,

		saveEmailError: state.user.saveEmailError,

		isSendingPasswordReset: state.user.sendingPasswordReset,
		hasSendPasswordReset: state.user.sendPasswordReset,
		passwordResetError: state.user.passwordResetError,

		createTokenModalIsOpen: state.ui.composerTokens.createTokenModalIsOpen,
		manageTokenModalIsOpen: state.ui.composerTokens.manageTokenModalIsOpen,
		manageTokenData: state.ui.composerTokens.manageTokenData,
		tokenError: state.ui.composerTokens.tokenError,

		newsletterSubscribed: state.ui.newsletter.subscribed,
		newsletterError: state.ui.newsletter.error,
		newsletterLoading: state.ui.newsletter.loading,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( fetchComposerTokens() );
	dispatch( getNewsletterStatus() );

	return {
		onUpdateEmail: ( email ) => {
			dispatch( profileUpdateEmail( email ) );
		},
		onSaveProfile: ( profile ) => {
			dispatch( updateProfile( profile ) );
		},
		resetSaveMessage: () => {
			dispatch( resetSaveMessage() );
		},
		onDeleteProfile: ( profile ) => {
			// eslint-disable-next-line
			if ( window.confirm( "WARNING! This action CANNOT be undone.\n\n" +
				"If you continue, you will lose access to your downloads and will no longer receive updates to" +
				" the premium plugins you've bought from Yoast.\n\nAre you sure you want to delete your Yoast account?" ) ) {
				dispatch( disableUser() );
			}
		},
		onPasswordReset: ( email ) => {
			dispatch( passwordResetSend( email ) );
		},
		onCreateTokenModalOpen: () => {
			dispatch( createTokenModalOpen() );
		},
		onCreateTokenModalClose: () => {
			dispatch( createTokenModalClosed() );
		},
		onCreateTokenClick: ( data ) => {
			dispatch( createComposerToken( data ) );
		},
		onManageTokenClick: ( data ) => {
			dispatch( manageTokenModalOpen( data ) );
		},
		onManageTokenModalClose: () => {
			dispatch( manageTokenModalClosed() );
		},
		onSaveTokenClick: ( data ) => {
			dispatch( renameComposerToken( data ) );
		},
		onDeleteTokenClick: ( data ) => {
			dispatch( deleteComposerToken( data ) );
		},
		onNewsletterSubscribe: () => {
			dispatch( subscribeNewsletter() );
		},
		onNewsletterUnsubscribe: () => {
			dispatch( unsubscribeNewsletter() );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let email = stateProps.email;

	const onPasswordReset = () => {
		dispatchProps.onPasswordReset( email );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, {
		onPasswordReset,
	} );
};

const ProfilePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( ProfilePage );

export default ProfilePageContainer;
